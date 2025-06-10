
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCompany } from "@/hooks/use-company";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export const VatSettings = () => {
  const { company, updateCompany } = useCompany();
  const { t } = useLanguage();
  const [vatEnabled, setVatEnabled] = useState(company?.vat_enabled || false);
  const [vatRate, setVatRate] = useState(company?.vat_rate || 15);
  const [vatNumber, setVatNumber] = useState(company?.vat_number || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!company) {
      toast.error("Company profile not found");
      return;
    }

    setSaving(true);
    try {
      const success = await updateCompany({
        ...company,
        vat_enabled: vatEnabled,
        vat_rate: vatRate,
        vat_number: vatNumber
      });

      if (success) {
        toast.success("VAT settings saved successfully");
      } else {
        toast.error("Failed to save VAT settings");
      }
    } catch (error) {
      console.error("Error saving VAT settings:", error);
      toast.error("An error occurred while saving VAT settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>VAT Settings</CardTitle>
        <CardDescription>
          Configure VAT/Tax settings for invoices and job cards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="vat-enabled"
            checked={vatEnabled}
            onCheckedChange={setVatEnabled}
          />
          <Label htmlFor="vat-enabled">Enable VAT/Tax</Label>
        </div>

        {vatEnabled && (
          <>
            <div className="space-y-2">
              <Label htmlFor="vat-rate">VAT Rate (%)</Label>
              <Input
                id="vat-rate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={vatRate}
                onChange={(e) => setVatRate(Number(e.target.value))}
                placeholder="15"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vat-number">VAT Number (Optional)</Label>
              <Input
                id="vat-number"
                value={vatNumber}
                onChange={(e) => setVatNumber(e.target.value)}
                placeholder="Enter your VAT registration number"
              />
            </div>
          </>
        )}

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save VAT Settings"}
        </Button>
      </CardContent>
    </Card>
  );
};
