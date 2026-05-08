export type UserRole = 'admin' | 'user'

export interface UserDoc {
  uid:       string
  name:      string
  email:     string
  avatar:    string
  role:      UserRole
  createdAt: any
  updatedAt: any
}
