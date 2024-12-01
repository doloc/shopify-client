'use client'
import { RecoilRoot, atom } from 'recoil'

export default function RecoidContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return <RecoilRoot>{children}</RecoilRoot>
}

export const loadingState = atom({
    key: 'loadingState',
    default: false,
})

export const languageState = atom({
    key: 'languageState',
    default: 'en',
})

export const cartState = atom({
    key: 'cardState',
    default: false,
})
