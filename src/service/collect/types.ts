import { Topic } from "../topic/types"

export interface TopicCollect {
    id:        number
    uid:       string
    tid:       string
    status:    number
    topic:     Topic
    created_at: string
    updated_at: string
}
