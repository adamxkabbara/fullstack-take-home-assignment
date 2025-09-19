import { ClipLoader } from "react-spinners"

type LoadingSpinnerProp = {
    isLoading?: boolean,
    size?: number
    color?: string
}

export const LoadingSpinner = ({isLoading = true, size, color}: LoadingSpinnerProp) => {
	return (
        <ClipLoader
            loading={isLoading}
            size={size}
            color={color}
        />
    )
}
