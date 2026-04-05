import { useId } from 'react'

import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const SelectRequired = ({ label, placeholder, options }: { label: string, placeholder: string, options: string[] }) => {
  const id = useId()

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id} className='gap-1'>
        {label} <span className='text-destructive'>*</span>
      </Label>
      <Select defaultValue={options[0]} required>
        <SelectTrigger id={id} className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={`${index}`} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectRequired
