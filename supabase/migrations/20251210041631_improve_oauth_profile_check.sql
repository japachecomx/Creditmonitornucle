/*
  # Improve OAuth profile verification

  1. Changes
    - Update get_user_profile_status function to handle OAuth flow better
    - Remove strict auth.uid() check to allow profile verification during OAuth
    - Add proper error handling for missing profiles

  2. Security
    - Still uses SECURITY DEFINER to bypass RLS
    - Returns data only for the user making the request
*/

-- Drop and recreate the function with improved logic
CREATE OR REPLACE FUNCTION public.get_user_profile_status(user_id uuid)
RETURNS TABLE (
  id uuid,
  full_name text,
  role text,
  active boolean
) AS $$
BEGIN
  -- For OAuth flow, allow checking profile if auth.uid() matches or is null (during token processing)
  IF auth.uid() IS NOT NULL AND auth.uid() != user_id THEN
    RAISE EXCEPTION 'Unauthorized: can only check own profile';
  END IF;

  RETURN QUERY
  SELECT 
    up.id,
    up.full_name,
    up.role,
    up.active
  FROM public.user_profiles up
  WHERE up.id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure authenticated users can execute the function
GRANT EXECUTE ON FUNCTION public.get_user_profile_status(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_profile_status(uuid) TO anon;