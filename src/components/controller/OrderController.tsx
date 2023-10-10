import React from "react"
import ProductsTableController from "./ProductsTableController"
import { useState } from "react"

const OrderController: React.FC = () => {
  const [formType, setFormType] = useState<string>("OrderClient");

  return (
    <ProductsTableController formType={formType}/>
  )

}

export default OrderController