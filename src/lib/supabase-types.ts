export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_programs: {
        Row: {
          id: string
          user_id: string
          user_data: Json
          ai_program: string | null
          created_at: string
          status: string | null
        }
        Insert: {
          id?: string
          user_id: string
          user_data: Json
          ai_program?: string | null
          created_at?: string
          status?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          user_data?: Json
          ai_program?: string | null
          created_at?: string
          status?: string | null
        }
      }
    }
  }
}