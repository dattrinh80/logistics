export interface CarrierProps {
  id?: string;
  code: string;
  name: string;
  active: boolean;
  capabilities?: Record<string, unknown> | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Carrier {
  private constructor(private props: CarrierProps) {
    this.props.active = props.active ?? true;
    if (this.props.capabilities === undefined) {
      this.props.capabilities = null;
    }
  }

  static create(props: {
    code: string;
    name: string;
    active?: boolean;
    capabilities?: Record<string, unknown> | null;
  }): Carrier {
    return new Carrier({
      code: props.code,
      name: props.name,
      active: props.active ?? true,
      capabilities: props.capabilities ?? null,
    });
  }

  static restore(props: CarrierProps): Carrier {
    return new Carrier(props);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get code(): string {
    return this.props.code;
  }

  set code(value: string) {
    this.props.code = value;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get active(): boolean {
    return this.props.active;
  }

  set active(value: boolean) {
    this.props.active = value;
  }

  get capabilities(): Record<string, unknown> | null | undefined {
    return this.props.capabilities;
  }

  set capabilities(value: Record<string, unknown> | null | undefined) {
    this.props.capabilities = value ?? null;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  set createdAt(value: Date | undefined) {
    this.props.createdAt = value;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  set updatedAt(value: Date | undefined) {
    this.props.updatedAt = value;
  }

  toObject(): CarrierProps {
    return { ...this.props };
  }
}
