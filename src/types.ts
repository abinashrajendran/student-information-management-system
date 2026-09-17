export interface SopStep {
  id: number;
  title: string;
  sopSection: string;
  shortDesc: string;
  tanglishSummary: string;
  objective: string;
  tasks: string[];
  deliverables: string[];
  codeTemplate?: {
    filename: string;
    language: string;
    code: string;
  };
  tips: string[];
  rubricWeight: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  entity: string;
  description: string;
  fields: { name: string; type: string; constraints: string; example: string }[];
  suggestedEndpoints: string;
}

export interface CrudRecord {
  id: string;
  title: string;
  category: string;
  status: 'Active' | 'Pending' | 'Completed' | 'Inactive';
  email?: string;
  value?: number;
  createdAt: string;
}
