import React, { useState } from 'react';
import { Download, Calendar, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

export const ExportData: React.FC = () => {
  const [dataType, setDataType] = useState('appointments');
  const [format, setFormat] = useState('csv');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleExport = () => {
    // Export logic would go here
    console.log('Exporting data:', {
      dataType,
      format,
      categories: selectedCategories,
      dateRange: { startDate, endDate }
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1">Export Data</h1>
          <p className="text-muted-foreground">
            Select data type, filters, and format to export.
          </p>
        </div>
      </div>

      <div className="max-w-4xl">
        <Card className="medical-card">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Step 1: Data Type */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <h2 className="text-lg font-semibold">Data Type</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose what you want to export.
                  </p>
                  
                  <RadioGroup value={dataType} onValueChange={setDataType} className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="appointments" id="appointments" />
                      <Label htmlFor="appointments" className="flex-1 cursor-pointer">
                        Appointments
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="patients" id="patients" />
                      <Label htmlFor="patients" className="flex-1 cursor-pointer">
                        Patients
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="system-users" id="system-users" />
                      <Label htmlFor="system-users" className="flex-1 cursor-pointer">
                        System Users
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Step 2: Filters */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <h2 className="text-lg font-semibold">Filters</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Apply filters to refine your export.
                  </p>

                  {dataType === 'system-users' && (
                    <div className="space-y-3">
                      <h3 className="font-medium">System User Categories</h3>
                      <p className="text-sm text-muted-foreground">(if applicable)</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {['Doctors', 'Nurses', 'Receptionists', 'Support Staff', 'Administration'].map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={category}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                            />
                            <Label htmlFor={category} className="text-sm cursor-pointer">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Date Range</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start-date" className="text-sm">Start Date</Label>
                        <Input
                          id="start-date"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          placeholder="mm/dd/yyyy"
                        />
                      </div>
                      <div>
                        <Label htmlFor="end-date" className="text-sm">End Date</Label>
                        <Input
                          id="end-date"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          placeholder="mm/dd/yyyy"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Format */}
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <h2 className="text-lg font-semibold">Format</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select the export file format.
                  </p>
                  
                  <RadioGroup value={format} onValueChange={setFormat} className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="csv" id="csv" />
                      <Label htmlFor="csv" className="flex-1 cursor-pointer">
                        CSV
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <RadioGroupItem value="pdf" id="pdf" />
                      <Label htmlFor="pdf" className="flex-1 cursor-pointer">
                        PDF
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Right Column - Summary */}
              <div className="space-y-6">
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Export Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Data Type:</span>
                      <span className="text-sm font-medium capitalize">{dataType.replace('-', ' ')}</span>
                    </div>
                    
                    {selectedCategories.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Categories:</span>
                        <span className="text-sm font-medium">{selectedCategories.length} selected</span>
                      </div>
                    )}
                    
                    {(startDate || endDate) && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Date Range:</span>
                        <span className="text-sm font-medium">
                          {startDate || 'Start'} - {endDate || 'End'}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Format:</span>
                      <span className="text-sm font-medium uppercase">{format}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleExport} 
                  className="w-full"
                  variant="medical"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">
          © 2023 MediConnect. All rights reserved.
        </p>
      </div>
    </div>
  );
};