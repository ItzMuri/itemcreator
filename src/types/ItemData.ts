export interface ItemData {
  name: string;
  label: string;
  weight: number;
  type: 'item' | 'weapon' | 'ammo';
  image: string;
  unique: boolean;
  useable: boolean;
  shouldClose: boolean;
  combinable: any;
  description: string;
  durability?: boolean;
  ammoname?: string;
  ammotype?: string;
  damagereason?: string;
  client: {
    image: string;
    export: string;
    status?: {
      hunger?: number;
      thirst?: number;
      stress?: number;
    };
    anim?: string | {
      dict: string;
      clip: string;
    };
    prop?: string | {
      model: string;
      bone: number;
      pos: {
        x: number;
        y: number;
        z: number;
      };
      rot: {
        x: number;
        y: number;
        z: number;
      };
    };
    usetime?: number;
    disable?: {
      move?: boolean;
      car?: boolean;
      combat?: boolean;
      mouse?: boolean;
    };
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
  decay: boolean;
  degrade: number;
  delete: boolean;
  qbDecay?: number;
}