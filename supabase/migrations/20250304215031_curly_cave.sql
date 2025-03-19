/*
  # Create user programs table

  1. New Tables
    - `user_programs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `user_data` (jsonb, stores user metrics and preferences)
      - `ai_program` (text, stores the generated program)
      - `created_at` (timestamp)
      - `status` (text, payment status)

  2. Security
    - Enable RLS on `user_programs` table
    - Add policies for authenticated users to:
      - Read their own programs
      - Create new programs
*/

CREATE TABLE IF NOT EXISTS user_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  user_data jsonb NOT NULL,
  ai_program text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE user_programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own programs"
  ON user_programs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create programs"
  ON user_programs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);