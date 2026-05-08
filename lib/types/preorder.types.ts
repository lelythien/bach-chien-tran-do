export interface PreorderDoc {
  id:        string   // document id = uid
  uid:       string
  name:      string
  email:     string
  createdAt: any
  status?:   'confirmed'
}
