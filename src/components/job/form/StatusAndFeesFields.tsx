
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobStatus } from "@/lib/types";

const statusOptions: JobStatus[] = [
  "In Progress",
  "Finished",
  "Waiting for Parts",
];

interface StatusAndFeesFieldsProps {
  status: JobStatus;
  handlingFees: number;
  companyId: string;
  companies: any[];
  companiesLoading: boolean;
  onStatusChange: (value: JobStatus) => void;
  onFeesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompanyChange: (value: string) => void;
}

export const StatusAndFeesFields = ({
  status,
  handlingFees,
  companyId,
  companies,
  companiesLoading,
  onStatusChange,
  onFeesChange,
  onCompanyChange
}: StatusAndFeesFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label>Status</Label>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue>{status}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map(statusOption => (
              <SelectItem key={statusOption} value={statusOption}>
                {statusOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Handling Fees</Label>
        <Input
          name="handlingFees"
          type="number"
          min="0"
          step="0.01"
          value={handlingFees}
          onChange={onFeesChange}
          placeholder="0.00"
        />
      </div>
      <div className="md:col-span-2">
        <Label>Company</Label>
        <Select
          value={companyId}
          onValueChange={onCompanyChange}
          disabled={companiesLoading}
        >
          <SelectTrigger>
            <SelectValue>
              {companyId === "none"
                ? "No company"
                : companies.find(c => c.id === companyId)?.name || "Select a company"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No company</SelectItem>
            {companies.map(company => (
              <SelectItem key={company.id} value={company.id || ""}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
