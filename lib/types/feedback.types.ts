export interface FeedbackDoc {
  id:        string   // Firestore doc id
  uid:       string
  name:      string
  avatar:    string
  rating:    number
  comment:   string
  createdAt: any
  approved:  boolean
}
