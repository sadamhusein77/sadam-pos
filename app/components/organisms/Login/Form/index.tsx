"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import {toast} from 'react-toastify'
import Cookies from "js-cookie";
import CryptoJS from "crypto-js"

export default function FormLogin() {
    const [isPassword, setIsPassword] = useState(true)
    const [loading, setLoading] = useState('')
    const [dataLogin, setDataLogin] = useState({
        username: '',
        password: ''
    })
    const [errDataLogin, setErrDataLogin] = useState({
        username: '',
        password: ''
    })

    const router = useRouter()

    const handleShowPassword = useCallback(
      () => {
        isPassword ? setIsPassword(false) : setIsPassword(true)
      },
      [isPassword],
    )
    
    const handleChangeForm = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {id, value} = e?.target
        setDataLogin((prev) => ({
            ...prev,
            [id]: value
        }))
      },
      [dataLogin],
    )

    const handlePostData = useCallback(
      () => {
        setLoading(() => ('submit'))
        const {username, password} = dataLogin
        const userAdmin = process.env.NEXT_PUBLIC_USERNAME_ADMIN
        const passAdmin = process.env.NEXT_PUBLIC_PASSWORD_ADMIN
        const userCustomer = process.env.NEXT_PUBLIC_USERNAME_CUSTOMER
        const passCustomer = process.env.NEXT_PUBLIC_PASSWORD_CUSTOMER
        if(username === userAdmin && password === passAdmin) {
            router.push('/dashboard')
            const data = {
                username: userAdmin,
                role: 'admin'
            }
            const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), `${process.env.NEXT_PUBLIC_CRYPTO_KEY}`).toString();
            Cookies.set('token-pos', ciphertext, {expires: 7})
        } else if(username === userCustomer && password === passCustomer) {
            router.push('/dashboard')
            const data = {
                username: userCustomer,
                role: 'customer'
            }
            const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), `${process.env.NEXT_PUBLIC_CRYPTO_KEY}`).toString();
            Cookies.set('token-pos', ciphertext, {expires: 7})
        } else {
            toast.error('Username dan Password Tidak Sesuai')
        }
        setLoading(() => (''))
      },
      [dataLogin],
    )
    

    const handleSubmitForm = useCallback(
      () => {
        let errUsername = '',
        errPassword = ''
        const {username, password} = dataLogin

        if(username.trim() === '') {
            errUsername = 'Username harus diisi'
        }

        if(password.trim() === '') {
            errPassword = 'Password harus diisi'
        }

        setErrDataLogin((prev) => ({
            ...prev,
            username: errUsername,
            password: errPassword
        }))

        if(errUsername === '' && errPassword === '') {
            handlePostData()
        }
      },
      [dataLogin],
    )
    
    
  return (
    <div className="flex flex-col justify-center gap-4 bg-white px-36 shadow-inner">
      <h3 className="text-4xl font-semibold text-center">SADAM POS</h3>
      <TextField
        variant="outlined"
        label="Username"
        placeholder="Masukkan Username"
        id="username"
        error={errDataLogin.username !== ''}
        value={dataLogin.username}
        helperText={errDataLogin.username}
        onChange={handleChangeForm}
      />
      <TextField
        variant="outlined"
        label="Password"
        placeholder="Masukkan Password"
        id="password"
        type={isPassword ? 'password' : 'text'}
        error={errDataLogin.password !== ''}
        helperText={errDataLogin.password}
        onChange={handleChangeForm}
        InputProps={{
            endAdornment: <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleShowPassword}
              edge="end"
            >
              {isPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }}
      />
      <Button
        disableElevation
        disableRipple
        variant="contained"
        className="!bg-rose-300 hover:bg-rose-400"
        disableTouchRipple
        onClick={handleSubmitForm}
      >
        {
            loading === 'submit' ?
            <CircularProgress size={30}  className="text-orange-500"  />
            :
            'Login'
        }
      </Button>
    </div>
  );
}
