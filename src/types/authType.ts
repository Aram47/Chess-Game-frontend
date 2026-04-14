export interface UserProfile {
  username: string;
  email: string;
  name: string;
  surname: string;
}

export interface IRegisterPayload extends UserProfile {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  login: string;
  password: string;
}

export interface AuthResponse {
  user: UserProfile;
}

export interface RefreshResponse {
  accessToken: string;
  user?: UserProfile;
}

// ─── Auth Context ──────────────────────────────────────────────────────────

export interface AuthContextType {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  login: (data: ILoginPayload) => Promise<boolean>;
  register: (data: IRegisterPayload) => Promise<boolean>;
  logout: () => void;
  resetPassword: (data: IResetPassword) => Promise<boolean>;
}

// ─── UI / Form ─────────────────────────────────────────────────────────────

export interface IFormData extends IRegisterPayload {
  confirmPassword: string;
  rememberMe?: boolean;
}

export interface IResetPassword {
  email: string;
}
export interface ISignUp {
  onClose: () => void;
  onSwitch?: () => void;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  subtitle?: string;
  onSubmit?: (e: React.FormEvent) => void;
  formData?: IFormData;
  isRegister?: boolean;
  isReset?: boolean;
  resetEmail?: string;
  setResetEmail?: (email: string) => void;
  setFormData?: React.Dispatch<React.SetStateAction<IFormData>>;
  isOpen?: () => void;
  handleGoogle: () => void;
}
