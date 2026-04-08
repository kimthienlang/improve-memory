import { useId } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const InputLabel = ({ type, label, placeholder }: { type: string, label: string, placeholder: string }) => {
  const id = useId()

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  )
}

export default InputLabel
