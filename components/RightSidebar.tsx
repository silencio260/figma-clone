import React, { useRef } from 'react'
// import Dimensions from './new_components/settings/Dimensions'
import Text from './new_components/settings/Text'
import Color from './new_components/settings/Color'
import Export from './new_components/settings/Export'
import Dimensions from './new_components/settings/Dimensions'
import { RightSidebarProps } from '@/types/type'
import { modifyShape } from '@/lib/shapes'
import { fabric } from 'fabric';

const RightSidebar = ({
  elementAttributes,
  fabricRef,
  isEditingRef,
  activeObjectRef,
  syncShapeInStorage,
  setElementAttributes
}: RightSidebarProps) => {

  const colorInputRef = useRef(null)
  const strokeInputRef = useRef(null)

  const handleInputChange = (property: string, value: string) => {
    if(!isEditingRef.current) isEditingRef.current = true

    setElementAttributes((prev) => ({
      ...prev,
      [property]: value
    }))

    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage
    })
  }

  return (
    <div className={`flex flex-col border-t border-primary-grey-200
    bg-primary-black text-primary-grey-300 min-2-[227px] sticky
    right-0 h-full max-sm:hidden select-none`}
    >
        <h3 className="px-5 pt-4 text-xs uppercase">
            Design
        </h3>
        <span className='text-xs text-primary-grey-300 mt-3 px-5 border-b border-primary-grey-200 pb-4'>
          Make Changes to canvas
        </span>

        <Dimensions 
          width={elementAttributes.width}
          height={elementAttributes.height}
          handleInputChange={handleInputChange}
          isEditingRef={isEditingRef}
        />
        <Text
          fontFamily={elementAttributes.fontFamily}
          fontSize={elementAttributes.fontSize}
          fontWeight={elementAttributes.fontWeight} 
          handleInputChange={handleInputChange}
        />
        <Color 
          inputRef={colorInputRef}
          attribute={elementAttributes.fill}
          attributeType='fill'
          placeholder='color'
          handleInputChange={handleInputChange}
        />
        <Color 
          inputRef={strokeInputRef}
          attribute={elementAttributes.stroke}
          attributeType='stroke'
          placeholder='stroke'
          handleInputChange={handleInputChange}
        />
        <Export />

    </div>
  )
}

export default RightSidebar