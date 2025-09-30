export interface CustomerProps {
  id?: string;
  code: string;
  name: string;
  contactEmail: string;
  active: boolean;
  webhookUrl?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Customer {
  private constructor(private props: CustomerProps) {
    this.props.active = props.active ?? true;
    if (this.props.webhookUrl === undefined) {
      this.props.webhookUrl = null;
    }
  }

  static create(props: {
    code: string;
    name: string;
    contactEmail: string;
    active?: boolean;
    webhookUrl?: string | null;
  }): Customer {
    return new Customer({
      code: props.code,
      name: props.name,
      contactEmail: props.contactEmail,
      active: props.active ?? true,
      webhookUrl: props.webhookUrl ?? null,
    });
  }

  static restore(props: CustomerProps): Customer {
    return new Customer(props);
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

  get contactEmail(): string {
    return this.props.contactEmail;
  }

  set contactEmail(value: string) {
    this.props.contactEmail = value;
  }

  get active(): boolean {
    return this.props.active;
  }

  set active(value: boolean) {
    this.props.active = value;
  }

  get webhookUrl(): string | null | undefined {
    return this.props.webhookUrl;
  }

  set webhookUrl(value: string | null | undefined) {
    this.props.webhookUrl = value ?? null;
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

  toObject(): CustomerProps {
    return { ...this.props };
  }
}
