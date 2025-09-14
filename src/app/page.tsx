"use client";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { use, useState } from "react";
import { authClient } from "@/lib/auth-client";
export default function Home() {
const[email,setEmail] = useState('');
const[name,setName] = useState('');
const[password,setPassword] = useState('');
 const { data: session} = authClient.useSession() 
const onSubmit = async () => {
  authClient.signUp.email({
    email,
    name,
    password,
  },{
    onError:() =>{
      window.alert('something went wrong');
    },
    onSuccess:() => {
      window.alert('success');
    }
  })
}
const onLogin = async () => {
  authClient.signIn.email({
    email,
    password,
  },{
    onError:() =>{
      window.alert('something went wrong');
    },
    onSuccess:() => {
      window.alert('success');
    }
  })
}
if(session)
{
  return(
    <div className="flex flex-col gap-y-4 p-4">
<p>Logged in as {session.user.name}</p>
<Button onClick={() => authClient.signOut() }>Logout</Button>
    </div>
  )
}

  return (
    <div className="flex flex-col gap-y-10">
 <div className="flex flex-col gap-y-4">
  <Input placeholder="name" value = {name} onChange={(e) => setName(e.target.value)} />
  <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
  <Input placeholder="password" type="password" value = {password} onChange={(e) => setPassword(e.target.value)} />
  <Button onClick = {onSubmit}>create user</Button>
 </div>
  <div className="flex flex-col gap-y-4">
  <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
  <Input placeholder="password" type="password" value = {password} onChange={(e) => setPassword(e.target.value)} />
  <Button onClick = {onLogin}>Login</Button>
 </div>
 </div>
  )
}
