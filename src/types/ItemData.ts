export interface ItemData {
  name: string;
  label: string;
  weight: number;
  type: 'item' | 'weapon';
  image: string;
  unique: boolean;
  useable: boolean;
  shouldClose: boolean;
  combinable: any;
  description: string;
  client: {
    image: string;
    export: string;
    status?: {
      hunger?: number;
      thirst?: number;
      stress?: number;
    };
    anim?: string;
    prop?: string;
    usetime?: number;
  };
  server: {
    export: string;
    test?: string;
  };
  buttons: Array<{
    label: string;
    action: string;
    group?: string;
  }>;
  stack: boolean;
  close: boolean;
  consume: number;
  decay: boolean | number;
  degrade: number;
  delete: boolean;
}