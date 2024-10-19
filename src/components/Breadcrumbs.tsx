import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
    items: { label: string; href?: string }[]; // Label for the breadcrumb and an optional href if it's a link
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <BreadcrumbItem key={index}>
                        {item.href ? (
                            <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                        ) : (
                            <span>{item.label}</span>
                        )}
                        {index < items.length - 1 && <BreadcrumbSeparator />}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default Breadcrumbs;
