
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useTranslation } from "@/translations";
import { Switch } from "@/components/ui/switch";

interface ContentFormProps {
  type: string;
  onSubmit: (data: any) => void;
  language: string;
}

const ContentForm = ({ type, onSubmit, language }: ContentFormProps) => {
  const t = useTranslation(language);
  const [formData, setFormData] = useState({
    // Common fields
    content: "",
    length: "",
    language: "",
    
    // Email specific
    emailType: "compose",
    senderName: "",
    receiverName: "",
    tone: "professional",
    
    // Essay specific
    essayType: "simple",
    
    // Social media specific
    platform: "linkedin",
    style: "professional",
    includeHashtags: false,
    includeEmojis: false,
    
    // Image specific
    imageStyle: "realistic",
    resolution: "medium",
    additionalDetails: "",
  });

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderEmailForm = () => (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Email Type</Label>
          <Select onValueChange={(value) => handleChange("emailType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select email type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compose">Compose New</SelectItem>
              <SelectItem value="reply">Reply</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Sender's Name</Label>
            <Input
              placeholder="Enter sender's name"
              onChange={(e) => handleChange("senderName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Receiver's Name</Label>
            <Input
              placeholder="Enter receiver's name"
              onChange={(e) => handleChange("receiverName", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tone</Label>
          <Select onValueChange={(value) => handleChange("tone", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );

  const renderEssayForm = () => (
    <>
      <div className="space-y-2">
        <Label>Essay Type</Label>
        <Select onValueChange={(value) => handleChange("essayType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select essay type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="simple">Simple</SelectItem>
            <SelectItem value="descriptive">Descriptive</SelectItem>
            <SelectItem value="narrative">Narrative</SelectItem>
            <SelectItem value="persuasive">Persuasive</SelectItem>
            <SelectItem value="professional">Professional</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  const renderSocialMediaForm = () => (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Platform</Label>
          <Select onValueChange={(value) => handleChange("platform", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="twitter">Twitter/X</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Style</Label>
          <Select onValueChange={(value) => handleChange("style", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
              <SelectItem value="inspirational">Inspirational</SelectItem>
              <SelectItem value="storytelling">Storytelling</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.platform === "instagram" && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="hashtags"
                onCheckedChange={(checked) => handleChange("includeHashtags", checked)}
              />
              <Label htmlFor="hashtags">Include Hashtags</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="emojis"
                onCheckedChange={(checked) => handleChange("includeEmojis", checked)}
              />
              <Label htmlFor="emojis">Include Emojis</Label>
            </div>
          </div>
        )}
      </div>
    </>
  );

  const renderImageForm = () => (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Image Style</Label>
          <Select onValueChange={(value) => handleChange("imageStyle", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realistic">Realistic</SelectItem>
              <SelectItem value="artistic">Artistic</SelectItem>
              <SelectItem value="cartoon">Cartoon</SelectItem>
              <SelectItem value="abstract">Abstract</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Resolution</Label>
          <Select onValueChange={(value) => handleChange("resolution", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select resolution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Common length selector for all types except image */}
      {type !== "image" && (
        <div className="space-y-2">
          <Label>{t("contentLength")}</Label>
          <Select onValueChange={(value) => handleChange("length", value)}>
            <SelectTrigger>
              <SelectValue placeholder={t("selectLength")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (~150 words)</SelectItem>
              <SelectItem value="medium">Medium (~350 words)</SelectItem>
              <SelectItem value="long">Long (~500 words)</SelectItem>
              <SelectItem value="extensive">Extensive (800+ words)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Type-specific forms */}
      {type === "email" && renderEmailForm()}
      {type === "essay" && renderEssayForm()}
      {type === "social" && renderSocialMediaForm()}
      {type === "image" && renderImageForm()}

      {/* Common content/prompt field */}
      <div className="space-y-2">
        <Label>{type === "image" ? t("imageDescription") : "Content"}</Label>
        <Textarea
          className="min-h-[150px] bg-white/5 border border-white/10 rounded-md p-3 text-white"
          placeholder={t("enterContent")}
          onChange={(e) => handleChange("content", e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full">
        {t("generateContent")}
      </Button>
    </motion.form>
  );
};

export default ContentForm;
