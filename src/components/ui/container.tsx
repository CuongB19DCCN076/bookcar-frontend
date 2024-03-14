import { cn } from "@/lib/utils"

interface ContainerProps {
    children: React.ReactNode,
    className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
    return (
        <div className={className}>
            <div className={cn("mx-auto max-w-7xl")}>
                {children}
            </div>
        </div>
    )
}

export default Container