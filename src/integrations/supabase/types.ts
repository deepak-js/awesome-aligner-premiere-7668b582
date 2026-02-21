export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_name: string
          author_role: string
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          is_published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string
          author_role?: string
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          author_role?: string
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          after_image_url: string | null
          before_image_url: string | null
          case_type: string
          clinic_name: string | null
          created_at: string
          description: string | null
          doctor_name: string | null
          featured: boolean | null
          id: string
          patient_age: number | null
          patient_gender: string | null
          testimonial: string | null
          title: string
          treatment_duration: string | null
        }
        Insert: {
          after_image_url?: string | null
          before_image_url?: string | null
          case_type: string
          clinic_name?: string | null
          created_at?: string
          description?: string | null
          doctor_name?: string | null
          featured?: boolean | null
          id?: string
          patient_age?: number | null
          patient_gender?: string | null
          testimonial?: string | null
          title: string
          treatment_duration?: string | null
        }
        Update: {
          after_image_url?: string | null
          before_image_url?: string | null
          case_type?: string
          clinic_name?: string | null
          created_at?: string
          description?: string | null
          doctor_name?: string | null
          featured?: boolean | null
          id?: string
          patient_age?: number | null
          patient_gender?: string | null
          testimonial?: string | null
          title?: string
          treatment_duration?: string | null
        }
        Relationships: []
      }
      chatbot_settings: {
        Row: {
          bot_name: string | null
          fallback_message: string | null
          id: string
          is_active: boolean | null
          quick_replies: Json | null
          updated_at: string | null
          webhook_url: string | null
          welcome_message: string | null
        }
        Insert: {
          bot_name?: string | null
          fallback_message?: string | null
          id?: string
          is_active?: boolean | null
          quick_replies?: Json | null
          updated_at?: string | null
          webhook_url?: string | null
          welcome_message?: string | null
        }
        Update: {
          bot_name?: string | null
          fallback_message?: string | null
          id?: string
          is_active?: boolean | null
          quick_replies?: Json | null
          updated_at?: string | null
          webhook_url?: string | null
          welcome_message?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          subject?: string
        }
        Relationships: []
      }
      doctor_applications: {
        Row: {
          city: string | null
          clinic_address: string | null
          clinic_name: string
          created_at: string
          current_aligner_brand: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          message: string | null
          partnership_tier: string | null
          patients_per_month: number | null
          phone: string
          specialty: string | null
          state: string | null
          status: string | null
          years_experience: number | null
        }
        Insert: {
          city?: string | null
          clinic_address?: string | null
          clinic_name: string
          created_at?: string
          current_aligner_brand?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          message?: string | null
          partnership_tier?: string | null
          patients_per_month?: number | null
          phone: string
          specialty?: string | null
          state?: string | null
          status?: string | null
          years_experience?: number | null
        }
        Update: {
          city?: string | null
          clinic_address?: string | null
          clinic_name?: string
          created_at?: string
          current_aligner_brand?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string | null
          partnership_tier?: string | null
          patients_per_month?: number | null
          phone?: string
          specialty?: string | null
          state?: string | null
          status?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      quiz_leads: {
        Row: {
          age_range: string | null
          alignment_issues: string[] | null
          budget_range: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          previous_treatment: boolean | null
          primary_concern: string | null
          quiz_score: number | null
          recommendation: string | null
          treatment_timeline: string | null
        }
        Insert: {
          age_range?: string | null
          alignment_issues?: string[] | null
          budget_range?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          previous_treatment?: boolean | null
          primary_concern?: string | null
          quiz_score?: number | null
          recommendation?: string | null
          treatment_timeline?: string | null
        }
        Update: {
          age_range?: string | null
          alignment_issues?: string[] | null
          budget_range?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          previous_treatment?: boolean | null
          primary_concern?: string | null
          quiz_score?: number | null
          recommendation?: string | null
          treatment_timeline?: string | null
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          custom_head_scripts: string | null
          facebook_pixel_id: string | null
          google_analytics_id: string | null
          id: string
          search_console_code: string | null
          updated_at: string
        }
        Insert: {
          custom_head_scripts?: string | null
          facebook_pixel_id?: string | null
          google_analytics_id?: string | null
          id?: string
          search_console_code?: string | null
          updated_at?: string
        }
        Update: {
          custom_head_scripts?: string | null
          facebook_pixel_id?: string | null
          google_analytics_id?: string | null
          id?: string
          search_console_code?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
