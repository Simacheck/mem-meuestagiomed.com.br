import { boolean } from "zod";

export interface VagaI {
  id: string;
  area: string;
  time: string;
  cidade: string;
  type: string;
  estado: string;
  bairro: string;
  semestreMin: string;
  dataFinalInscricao: string;
  initialDate: string;
  finishDate: string;
  descricao: string;
  infoMedico?: InfoMedicoI;
  atividades?: string[];
  requisitos?: string[];
  inscricoesStatus: string;
}
export interface InfoMedicoI {
  qtdeInscritos: number;
  status: boolean;
  inscritos: InscritoI[];
  selecionado?: InscritoI;
  situacao: string;
}

export interface InscritoI {
  id: number;
  nome: string;
  faculdade: string;
  periodo: string;
  currículo: string;
  discricao: string;
  cidade: string;
  areas: string[];
  celular?: string;
  email?: string;
  status?: string;
}

export interface FileRequestI {
  content: string;
  type: string;
}

export interface AddressI {
  id?: string;
  street?: string;
  street_number?: string;
  neighbourhood?: string;
  complement?: string;
  reference?: string;
  postal_code?: string;
  city?: string;
  federative_unit_st?: string;
  federative_unit_lg?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  formatted_address?: string;
  gmaps_id?: string;
}

export interface UniversityI {
  id?: string;
  name?: string;
  description?: string;
  modality?: string;
  is_active?: boolean;
  fk_address?: string;
  address?: AddressI;
}

export interface ActivityI {
  id?: string;
  name?: string;
  is_active?: boolean;
}

export interface SpecialityI {
  id?: string;
  name?: string;
  is_active?: boolean;
}

export interface LocationsI {
  id?: string;
  name?: string;
  description?: string;
  type?: string;
  modality?: string;
  picture_url?: string;
  is_active?: boolean;
  fk_address?: string;
  address?: AddressI;
  specialities?: SpecialityI;
}

export interface MedicI {
  id?: string;
  name?: string;
  birthdate?: string;
  tax_document?: string;
  personal_document?: string;
  professional_certificate?: string;
  federative_unit_professional_certificate?: string;
  residency_year?: string;
  picture_url?: FileRequestI | string;
  phone_number?: string;
  email?: string;
  usage_terms?: string;
  is_active?: boolean;
  fk_address?: string;
  address?: AddressI;
  fk_university_graduation?: string;
  university_graduation?: UniversityI;
  fk_university_residency?: string;
  university_residency?: UniversityI;
  specialities?: SpecialityI[];
  locations?: LocationsI[];
  openings?: any
}

export interface StudentI {
  id?: string;
  name?: string;
  birthdate?: string;
  tax_document?: string;
  personal_document?: string;
  school_term?: string;
  enrollment_certificate_url?: FileRequestI | string;
  picture_url?: FileRequestI | string;
  phone_number?: string;
  email?: string;
  usage_terms?: string;
  is_active?: boolean;
  fk_address?: string;
  address?: AddressI;
  fk_university?: string;
  university?: UniversityI;
  specialities?: SpecialityI[];
  locations?: LocationsI[];
  curriculums?: any[];
  openings?: any
}

export interface OpeningI {
  id?: string;
  name?: string;
  description?: string;
  short_description?: string;
  status?: string;
  total_hours?: number;
  school_term_min?: number;
  school_term_max?: number;
  start_date?: string;
  end_date?: string;
  due_date?: string;
  is_active?: boolean;
  activities?: ActivityI[];
  students?: StudentI[];
  fk_speciality?: string;
  speciality?: SpecialityI;
  fk_medic?: string;
  fk_location?: string;
  location?: LocationsI;
}

export interface CurriculumObj {
  id?: string;
  description?: string;
  name_tag?: string;
  url?: string;
  is_active?: boolean;
  fk_student?: string;
}