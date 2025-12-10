/*
  # Add user_profiles insert policy
  
  1. Changes
    - Add INSERT policy for user_profiles table to allow users to create their own profile during registration
  
  2. Security
    - Users can only create a profile for their own user ID
    - Ensures users cannot create profiles for other users
*/

-- Add INSERT policy for user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'user_profiles' 
    AND policyname = 'Users can create their own profile'
  ) THEN
    CREATE POLICY "Users can create their own profile"
      ON user_profiles FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;
