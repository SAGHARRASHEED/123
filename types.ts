export interface Account {
  id: string;
  name: string;
  avatarUrl: string;
  clients: Client[];
  lastProcessedClientIndex: number;
}

export interface Client {
  profileUrl: string;
  name: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  accountId: string;
  accountName: string;
  clientName: string;
  status: 'Sent' | 'Failed' | 'In Progress';
  message: string;
  source: 'Base' | 'AI' | 'Spintax';
}

export interface ThemeColors {
  '--color-bg-base': string;
  '--color-bg-surface': string;
  '--color-bg-muted': string;
  '--color-bg-subtle': string;
  '--color-text-base': string;
  '--color-text-muted': string;
  '--color-text-subtle': string;
  '--color-border': string;
  '--color-ring': string;
  '--color-primary': string;
  '--color-primary-dark': string;
  '--color-danger': string;
  '--color-danger-dark': string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  backgroundImage?: string | null;
  blur?: number;
  dim?: number;
}