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
import { motion } from "framer-motion";

interface ContentFormProps {
  type: string;
  onSubmit: (data: any) => void;
}

const ContentForm = ({ type, onSubmit }: ContentFormProps) => {
  const [formData, setFormData] = useState({
    tone: "",
    language: "English",
    length: "",
    platform: "",
    style: "",
    content: "",
    imageStyle: "",
    additionalDetails: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {type === "email" && (
        <>
          <div className="space-y-2">
            <Label>Email Type</Label>
            <Select
              onValueChange={(value) => handleChange("emailType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select email type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compose">Compose</SelectItem>
                <SelectItem value="reply">Reply</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tone</Label>
            <Select onValueChange={(value) => handleChange("tone", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="persuasive">Persuasive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Sender Name</Label>
              <Input
                placeholder="Enter sender name"
                onChange={(e) => handleChange("senderName", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Receiver Name</Label>
              <Input
                placeholder="Enter receiver name"
                onChange={(e) => handleChange("receiverName", e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {type === "essay" && (
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
      )}

      {type === "social" && (
        <>
          <div className="space-y-2">
            <Label>Platform</Label>
            <Select onValueChange={(value) => handleChange("platform", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
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
        </>
      )}

      {type === "text" && (
        <div className="space-y-2">
          <Label>Text Type</Label>
          <Select onValueChange={(value) => handleChange("textType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select text type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summarization">Summarization</SelectItem>
              <SelectItem value="elaboration">Elaboration</SelectItem>
              <SelectItem value="creative">Creative Writing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {type === "image" && (
        <>
          <div className="space-y-2">
            <Label>Image Style</Label>
            <Select onValueChange={(value) => handleChange("imageStyle", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realistic">Realistic</SelectItem>
                <SelectItem value="artistic">Artistic</SelectItem>
                <SelectItem value="3d">3D Render</SelectItem>
                <SelectItem value="cartoon">Cartoon</SelectItem>
                <SelectItem value="sketch">Sketch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Image Description</Label>
            <textarea
              className="input-field min-h-[150px]"
              placeholder="Describe the image you want to generate..."
              onChange={(e) => handleChange("content", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Additional Details</Label>
            <textarea
              className="input-field min-h-[100px]"
              placeholder="Add any specific details about lighting, composition, colors, etc..."
              onChange={(e) => handleChange("additionalDetails", e.target.value)}
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label>Content Length</Label>
        <Select onValueChange={(value) => handleChange("length", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select length" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short (~150 words)</SelectItem>
            <SelectItem value="medium">Medium (~350 words)</SelectItem>
            <SelectItem value="long">Long (~500 words)</SelectItem>
            <SelectItem value="extensive">Extensive (~800+ words)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <textarea
          className="input-field min-h-[150px]"
          placeholder="Enter your content or prompt here..."
          onChange={(e) => handleChange("content", e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full">
        Generate Content
      </Button>
    </motion.form>
  );
};

export default ContentForm;
