import Breadcrumbs from "./Breadcrumbs";
import Heading from "./Heading";

interface PageHeaderProps extends Omit<React.ComponentPropsWithoutRef<typeof Heading>, 'as'> {
    breadcrumbs?: React.ReactElement<React.ComponentPropsWithoutRef<typeof Breadcrumbs>>;
};

export default function PageHeader({ breadcrumbs, ...props }: PageHeaderProps) {
    return (
        <div className="w-full">
            {breadcrumbs}
            <Heading {...props} className="px-1" />
        </div>
    );
}