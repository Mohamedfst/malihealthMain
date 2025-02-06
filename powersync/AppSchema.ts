import { column, Schema, Table } from '@powersync/react-native';

export const TODOS_TABLE = 'todos';
export const ORGANIZATION_TABlE = 'organization';
export const CENTER_TABlE = 'centers';
export const PATIENT_TABLE = 'patients';
export const CAMPAIGN_TABLE = 'campaigns';
export const MEDICATION_TABLE = 'medications';


const todos = new Table({
  task: column.text,
  user_id: column.text,
  is_complete: column.integer,
});

const medications = new Table({
  name: column.text,
  description: column.text,
});

const organization = new Table({
  name: column.text,
  address: column.text,
  email: column.text,
  number: column.text,
  type: column.text,
});

const centers = new Table({
  name: column.text,
  address: column.text,
  email: column.text,
  number: column.text,
  type: column.text,
  organization_id: column.text,
});

const patients = new Table({
  name: column.text,
  last_name: column.text,
  dob: column.text,
  national_license: column.text,
  number: column.text,
  email: column.text,
  address: column.text,
  emergency_num: column.text,
  languages: column.text,
  center_id: column.text,
});

const campaigns = new Table({
  title: column.text,
  description: column.text,
  is_active: column.text,
  center_id: column.text,
});

export const AppSchema = new Schema({
  organization,
  todos,
  centers,
  patients,
  campaigns,
  medications,
});

export type Database = (typeof AppSchema)['types'];
export type Todo = Database['todos'];
export type Organization = Database['organization'];
export type Center = Database['centers'];
export type Patients = Database['patients'];
export type Campaigns = Database['campaigns'];
export type Medications = Database['medications'];
