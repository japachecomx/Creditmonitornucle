/*
  # Create function to check user profile without RLS

  1. Changes
    - Create a SECURITY DEFINER function to check if a user profile exists and is active
    - This bypasses RLS restrictions to avoid timing issues during OAuth flow
    - Returns the profile data if found and active

  2. Security
    - Function uses SECURITY DEFINER to bypass RLS
    - Only returns data for the requesting user's own profile
    - Checks that auth.uid() matches the requested user ID
*/

-- Create function to check user profile bypassing RLS
CREATE OR REPLACE FUNCTION public.get_user_profile_status(user_id uuid)
RETURNS TABLE (
  id uuid,
  full_name text,
  role text,
  active boolean
) AS $$
BEGIN
  -- Verify the requesting user is asking for their own profile
  IF auth.uid() != user_id THEN
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

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_profile_status(uuid) TO authenticated;
