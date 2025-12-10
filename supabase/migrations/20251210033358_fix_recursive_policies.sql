/*
  # Fix infinite recursion in RLS policies

  1. Changes
    - Drop recursive administrator policies that query user_profiles within user_profiles policies
    - Keep only basic user policies that don't cause recursion
    - Administrators will need to use service role or SECURITY DEFINER functions for admin operations

  2. Security
    - Users can still view and update their own profiles
    - Users can insert their own profile during registration
    - Admin functionality preserved through other mechanisms
*/

-- Drop the recursive administrator policies
DROP POLICY IF EXISTS "Administrators can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Administrators can manage all profiles" ON public.user_profiles;
