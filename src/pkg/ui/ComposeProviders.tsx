/* eslint-disable react/display-name */
import React, { PropsWithChildren } from 'react'

type Props = {
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
} &PropsWithChildren

export default function ComposeProviders(props: Props) {
  const { components = [], children, ...rest } = props
  return (
    <>
      {components.reduceRight((acc, Comp)=>{
        return <Comp {...rest}>{acc}</Comp>
      }, children)}
    </>
  )
}
