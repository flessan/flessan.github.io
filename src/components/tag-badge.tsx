import { Badge } from "@/components/ui/badge";

interface TagBadgeProps {
    tag: string;
}

export default function TagBadge({ tag }: TagBadgeProps) {
    return (
        <Badge variant="secondary" className="font-normal bg-accent/20 text-accent-foreground hover:bg-accent/30 cursor-default">
            {tag}
        </Badge>
    );
}
