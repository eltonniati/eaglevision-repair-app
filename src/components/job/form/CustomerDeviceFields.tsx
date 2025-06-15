
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomerDeviceFieldsProps {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const CustomerDeviceFields = ({ form, handleChange }: CustomerDeviceFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Customer Name *</Label>
          <Input
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
            placeholder="Enter customer name"
          />
        </div>
        <div>
          <Label>Customer Phone *</Label>
          <Input
            name="customerPhone"
            value={form.customerPhone}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
          />
        </div>
        <div className="md:col-span-2">
          <Label>Customer Email</Label>
          <Input
            name="customerEmail"
            value={form.customerEmail}
            onChange={handleChange}
            type="email"
            placeholder="Enter email address (optional)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Device Name *</Label>
          <Input
            name="deviceName"
            value={form.deviceName}
            onChange={handleChange}
            required
            placeholder="e.g., iPhone, Samsung Galaxy"
          />
        </div>
        <div>
          <Label>Device Model *</Label>
          <Input
            name="deviceModel"
            value={form.deviceModel}
            onChange={handleChange}
            required
            placeholder="e.g., 14 Pro, S23 Ultra"
          />
        </div>
        <div className="md:col-span-2">
          <Label>Device Condition *</Label>
          <Input
            name="deviceCondition"
            value={form.deviceCondition}
            onChange={handleChange}
            required
            placeholder="Describe the current condition"
          />
        </div>
      </div>
    </>
  );
};
