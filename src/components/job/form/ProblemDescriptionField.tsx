
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProblemDescriptionFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ProblemDescriptionField = ({ value, onChange }: ProblemDescriptionFieldProps) => {
  return (
    <div>
      <Label>Problem Description *</Label>
      <Textarea
        name="problem"
        value={value}
        onChange={onChange}
        required
        rows={4}
        placeholder="Describe the issue or problem"
      />
    </div>
  );
};
