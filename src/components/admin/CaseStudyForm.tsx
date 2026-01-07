import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2 } from "lucide-react";

interface CaseStudyFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const caseTypes = [
  { value: "crowding", label: "Crowding" },
  { value: "spacing", label: "Spacing/Gaps" },
  { value: "overbite", label: "Overbite" },
  { value: "underbite", label: "Underbite" },
  { value: "crossbite", label: "Crossbite" },
  { value: "complex", label: "Complex Cases" },
];

const CaseStudyForm = ({ onSuccess, onCancel }: CaseStudyFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState<string>("");
  const [afterPreview, setAfterPreview] = useState<string>("");
  
  const [formData, setFormData] = useState({
    title: "",
    case_type: "",
    treatment_duration: "",
    description: "",
    patient_age: "",
    patient_gender: "",
    doctor_name: "",
    clinic_name: "",
    testimonial: "",
    featured: false,
  });

  const handleImageSelect = (file: File, type: "before" | "after") => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "before") {
        setBeforeImage(file);
        setBeforePreview(reader.result as string);
      } else {
        setAfterImage(file);
        setAfterPreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async (file: File, type: "before" | "after"): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${type}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("case-studies")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("case-studies")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.case_type) {
      toast({
        title: "Missing required fields",
        description: "Please fill in the title and case type.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      let beforeImageUrl = "";
      let afterImageUrl = "";

      if (beforeImage) {
        beforeImageUrl = await uploadImage(beforeImage, "before");
      }

      if (afterImage) {
        afterImageUrl = await uploadImage(afterImage, "after");
      }

      const { error } = await supabase.from("case_studies").insert({
        title: formData.title,
        case_type: formData.case_type,
        treatment_duration: formData.treatment_duration || null,
        description: formData.description || null,
        patient_age: formData.patient_age ? parseInt(formData.patient_age) : null,
        patient_gender: formData.patient_gender || null,
        doctor_name: formData.doctor_name || null,
        clinic_name: formData.clinic_name || null,
        testimonial: formData.testimonial || null,
        featured: formData.featured,
        before_image_url: beforeImageUrl || null,
        after_image_url: afterImageUrl || null,
      });

      if (error) throw error;

      toast({
        title: "Case study added!",
        description: "The case study has been successfully created.",
      });

      onSuccess();
    } catch (error) {
      console.error("Error creating case study:", error);
      toast({
        title: "Error",
        description: "Failed to create case study. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Before Image Upload */}
        <div className="space-y-2">
          <Label>Before Image</Label>
          <div className="border-2 border-dashed border-border rounded-xl p-4 text-center">
            {beforePreview ? (
              <div className="relative">
                <img
                  src={beforePreview}
                  alt="Before preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setBeforeImage(null);
                    setBeforePreview("");
                  }}
                  className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer block py-6">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Click to upload before image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageSelect(file, "before");
                  }}
                />
              </label>
            )}
          </div>
        </div>

        {/* After Image Upload */}
        <div className="space-y-2">
          <Label>After Image</Label>
          <div className="border-2 border-dashed border-border rounded-xl p-4 text-center">
            {afterPreview ? (
              <div className="relative">
                <img
                  src={afterPreview}
                  alt="After preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setAfterImage(null);
                    setAfterPreview("");
                  }}
                  className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer block py-6">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Click to upload after image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageSelect(file, "after");
                  }}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Crowding Correction - Sarah"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="case_type">Case Type *</Label>
          <Select
            value={formData.case_type}
            onValueChange={(value) => setFormData({ ...formData, case_type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select case type" />
            </SelectTrigger>
            <SelectContent>
              {caseTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="treatment_duration">Treatment Duration</Label>
          <Input
            id="treatment_duration"
            value={formData.treatment_duration}
            onChange={(e) => setFormData({ ...formData, treatment_duration: e.target.value })}
            placeholder="e.g., 8 months"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="patient_age">Patient Age</Label>
          <Input
            id="patient_age"
            type="number"
            value={formData.patient_age}
            onChange={(e) => setFormData({ ...formData, patient_age: e.target.value })}
            placeholder="e.g., 28"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="patient_gender">Patient Gender</Label>
          <Select
            value={formData.patient_gender}
            onValueChange={(value) => setFormData({ ...formData, patient_gender: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="doctor_name">Doctor Name</Label>
          <Input
            id="doctor_name"
            value={formData.doctor_name}
            onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
            placeholder="e.g., Dr. Priya Sharma"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clinic_name">Clinic Name</Label>
          <Input
            id="clinic_name"
            value={formData.clinic_name}
            onChange={(e) => setFormData({ ...formData, clinic_name: e.target.value })}
            placeholder="e.g., Smile Dental Clinic, Mumbai"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the case, treatment approach, and results..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="testimonial">Patient Testimonial</Label>
        <Textarea
          id="testimonial"
          value={formData.testimonial}
          onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
          placeholder="Patient's feedback or testimonial quote..."
          rows={2}
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
        />
        <Label htmlFor="featured">Featured Case (shown first)</Label>
      </div>

      <div className="flex gap-3 justify-end pt-4 border-t border-border">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Add Case Study
        </Button>
      </div>
    </form>
  );
};

export default CaseStudyForm;
