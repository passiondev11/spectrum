// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Link } from 'react-router-dom';
import { UserHoverProfile } from 'src/components/hoverProfile';
import { LikeButton } from 'src/components/threadLikes';
import { convertTimestampToDate } from 'shared/time-formatting';
import type { GetThreadType } from 'shared/graphql/queries/thread/getThread';
import getThreadLink from 'src/helpers/get-thread-link';
import { useAppScroller } from 'src/hooks/useAppScroller';
import {
  StickyHeaderContent,
  CommunityHeaderName,
  CommunityHeaderMeta,
  CommunityHeaderSubtitle,
  CommunityHeaderMetaCol,
  StickyHeaderContainer,
  StickyHeaderActionsContainer,
} from '../style';

type Props = {
  thread: GetThreadType,
};

const StickyHeader = (props: Props) => {
  const { thread } = props;
  const { scrollToTop } = useAppScroller();
  const { channel, community } = thread;

  const createdAt = new Date(thread.createdAt).getTime();
  const timestamp = convertTimestampToDate(createdAt);

  return (
    <StickyHeaderContainer>
      <StickyHeaderContent onClick={scrollToTop}>
        <CommunityHeaderMeta>
          <CommunityHeaderMetaCol>
            <CommunityHeaderName>{thread.content.title}</CommunityHeaderName>
            <CommunityHeaderSubtitle>
              <UserHoverProfile username={thread.author.user.username}>
                <Link to={`/users/${thread.author.user.username}`}>
                  {thread.author.user.name} (@{thread.author.user.username})
                </Link>
              </UserHoverProfile>
              &nbsp;·&nbsp;
              <Link to={getThreadLink(thread)}>{timestamp}</Link>
            </CommunityHeaderSubtitle>
          </CommunityHeaderMetaCol>
        </CommunityHeaderMeta>
      </StickyHeaderContent>

      {channel.channelPermissions.isMember && (
        <StickyHeaderActionsContainer>
          <LikeButton thread={thread} />
        </StickyHeaderActionsContainer>
      )}
    </StickyHeaderContainer>
  );
};

export default compose(connect())(StickyHeader);
