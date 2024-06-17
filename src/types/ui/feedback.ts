import type { ContentWithId, EventHandler } from "..";
import TextButton from "@/components/ui/TextButton";

export type FeedbackAction =
    EventHandler<'click'> &
    Pick<ContentWithId, 'id' | 'isDisabled'> &
    Pick<React.ComponentPropsWithoutRef<typeof TextButton>, 'label' | 'variant' | 'href' | 'iconBefore' | 'iconAfter'>;