import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface BreadcrumbsProps {
    items: { label: string; href?: string }[]; // Label for the breadcrumb and an optional href if it's a link
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            {item.href ? (
                                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                            ) : (
                                <span>{item.label}</span>
                            )}
                        </BreadcrumbItem>
                        {index < items.length - 1 && <BreadcrumbSeparator key={`separator-${index}`} />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default Breadcrumbs;
