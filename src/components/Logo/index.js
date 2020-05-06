import React from "react"
import css from "./style.module.css"
import logoImage from "../../assets/images/burger-logo.png"

const Logo = () => (
<div className={css.Logo} >
<img className={css.img} src ={logoImage}/>
</div>
)


export default Logo