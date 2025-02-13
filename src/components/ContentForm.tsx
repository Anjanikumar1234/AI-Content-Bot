
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
import { useTranslation } from "@/translations";

interface ContentFormProps {
  type: string;
  onSubmit: (data: any) => void;
  language: string;
}

const ContentForm = ({ type, onSubmit, language }: ContentFormProps) => {
  const t = useTranslation(language);
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
      {type === "image" && (
        <>
          <div className="space-y-2">
            <Label>{t("imageStyle")}</Label>
            <Select onValueChange={(value) => handleChange("imageStyle", value)}>
              <SelectTrigger>
                <SelectValue placeholder={t("selectStyle")} />
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
            <Label>{t("imageDescription")}</Label>
            <textarea
              className="w-full min-h-[150px] bg-white/5 border border-white/10 rounded-md p-3 text-white"
              placeholder={t("enterContent")}
              onChange={(e) => handleChange("content", e.target.value)}
            />
          </div>
        </>
      )}

      {type !== "image" && (
        <>
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
                <SelectItem value="extensive">Extensive (~800+ words)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <textarea
              className="w-full min-h-[150px] bg-white/5 border border-white/10 rounded-md p-3 text-white"
              placeholder={t("enterContent")}
              onChange={(e) => handleChange("content", e.target.value)}
            />
          </div>
        </>
      )}

      <Button type="submit" className="w-full">
        {t("generateContent")}
      </Button>
    </motion.form>
  );
};

export default ContentForm;
