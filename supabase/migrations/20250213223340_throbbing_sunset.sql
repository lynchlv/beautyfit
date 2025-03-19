/*
  # Create bookings table

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `trainer_id` (integer)
      - `date` (date)
      - `time` (time)
      - `goal` (text)
      - `height` (numeric)
      - `weight` (numeric)
      - `age` (integer)
      - `activity_level` (text)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for authenticated users to read their own bookings
    - Add policy for authenticated users to create bookings
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  trainer_id integer NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  goal text NOT NULL,
  height numeric NOT NULL,
  weight numeric NOT NULL,
  age integer NOT NULL,
  activity_level text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'confirmed'
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);