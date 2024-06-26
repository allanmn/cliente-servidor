declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

export const CandidatoItems: RouteInfo[] = [
  { path: '/user', title: 'Usuário', icon: 'person' },
];

export const EmpresaItems: RouteInfo[] = [
  { path: '/job-announcements', title: 'Vagas', icon: 'briefcase' },
  { path: '/user', title: 'Usuário', icon: 'person' },
];
