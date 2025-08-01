import React, { useState } from 'react';
import { FileText, Download, Printer, Eye, Plus, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export const Documents: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<{
    value: number;
    classification: string;
    color: string;
  } | null>(null);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    
    if (weightNum && heightNum && heightNum > 0) {
      const bmi = weightNum / (heightNum * heightNum);
      const classification = getBMIClassification(bmi);
      const color = getBMIColor(bmi);
      
      setBmiResult({
        value: bmi,
        classification,
        color
      });
    }
  };

  const getBMIClassification = (bmi: number) => {
    if (bmi < 18.5) return 'Abaixo do peso';
    if (bmi < 25) return 'Peso normal';
    if (bmi < 30) return 'Sobrepeso';
    return 'Obesidade';
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5 || bmi >= 30) return 'text-destructive';
    if (bmi < 25) return 'text-success';
    return 'text-warning';
  };

  const documentTypes = [
    {
      id: 'medical-record',
      title: 'Prontuário Médico',
      description: 'Histórico clínico completo do paciente',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 'patient-form',
      title: 'Ficha Cadastral',
      description: 'Dados pessoais e informações básicas',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      id: 'attendance-certificate',
      title: 'Declaração de Comparecimento',
      description: 'Comprovante de presença na consulta',
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      id: 'prescription',
      title: 'Receita Médica',
      description: 'Prescrição de medicamentos',
      icon: FileText,
      color: 'text-orange-600'
    },
    {
      id: 'medical-certificate',
      title: 'Atestado Médico',
      description: 'Documento para justificar ausências',
      icon: FileText,
      color: 'text-red-600'
    },
    {
      id: 'referral',
      title: 'Encaminhamento',
      description: 'Indicação para outro especialista',
      icon: FileText,
      color: 'text-indigo-600'
    }
  ];

  const patients = [
    { id: '1', name: 'Maria Silva' },
    { id: '2', name: 'João Santos' },
    { id: '3', name: 'Ana Costa' },
    { id: '4', name: 'Carlos Lima' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1">Documentos e Impressões</h1>
          <p className="text-muted-foreground">
            Gere e imprima documentos médicos
          </p>
        </div>
        <Button variant="medical">
          <Plus className="w-4 h-4 mr-2" />
          Novo Documento
        </Button>
      </div>

      {/* Patient Selection */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Selecionar Paciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient-select">Paciente</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um paciente" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                Buscar Paciente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BMI Calculator */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Calculadora de IMC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder="Ex: 70.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Altura (m)</Label>
              <Input
                id="height"
                type="number"
                step="0.01"
                placeholder="Ex: 1.75"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <Button onClick={calculateBMI} variant="medical">
              Calcular IMC
            </Button>
          </div>
          
          {bmiResult && (
            <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">{bmiResult.value.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground">IMC</div>
                </div>
                <div>
                  <div className={`text-lg font-semibold ${bmiResult.color}`}>
                    {bmiResult.classification}
                  </div>
                  <div className="text-sm text-muted-foreground">Classificação</div>
                </div>
                <div className="flex items-center justify-center">
                  <Badge 
                    className={
                      bmiResult.value < 18.5 || bmiResult.value >= 30 ? 'status-inactive' :
                      bmiResult.value < 25 ? 'status-active' : 'status-pending'
                    }
                  >
                    {bmiResult.value < 25 ? 'Saudável' : 'Atenção'}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentTypes.map((docType) => {
          const Icon = docType.icon;
          return (
            <Card key={docType.id} className="medical-card hover:shadow-md transition-all cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-secondary rounded-lg">
                    <Icon className={`w-6 h-6 ${docType.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{docType.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{docType.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Visualizar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Printer className="w-4 h-4 mr-1" />
                    Imprimir
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Custom Document Creation */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Criar Documento Personalizado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doc-title">Título do Documento</Label>
              <Input id="doc-title" placeholder="Ex: Relatório de Exame" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-type">Tipo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="report">Relatório</SelectItem>
                  <SelectItem value="certificate">Certificado</SelectItem>
                  <SelectItem value="prescription">Receita</SelectItem>
                  <SelectItem value="referral">Encaminhamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="doc-content">Conteúdo</Label>
            <Textarea 
              id="doc-content"
              placeholder="Digite o conteúdo do documento..."
              rows={6}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline">
              Salvar Rascunho
            </Button>
            <Button variant="medical">
              Gerar Documento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};