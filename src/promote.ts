import bent, {ValidResponse} from 'bent'

export async function promote(
  url: string,
  username: string,
  password: string,
  source: string,
  targetRepo: string,
  dockerRepository: string,
  tag: string,
  targetTag: string,
  copy: boolean
): Promise<ValidResponse> {
  const payload: Record<string, string | boolean> = {
    targetRepo,
    dockerRepository,
    copy
  }
  if (tag !== '') {
    payload.tag = tag
  }
  if (targetTag !== '') {
    payload.targetTag = targetTag
  }

  const post = bent(url, 'POST', 'json')
  const auth = Buffer.from(`${username}:${password}`).toString('base64')
  return post(`/artifactory/api/docker/${source}/v2/promote`, payload, {
    Authorization: `Basic ${auth}`
  })
}
