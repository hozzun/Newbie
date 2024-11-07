package com.newbie.auth.member.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 2069408659L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMember member = new QMember("member1");

    public final StringPath address = createString("address");

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final StringPath email = createString("email");

    public final BooleanPath isResigned = createBoolean("isResigned");

    public final ListPath<MemberPlayerLike, QMemberPlayerLike> likedPlayers = this.<MemberPlayerLike, QMemberPlayerLike>createList("likedPlayers", MemberPlayerLike.class, QMemberPlayerLike.class, PathInits.DIRECT2);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final QMemberImage memberImage;

    public final StringPath nickname = createString("nickname");

    public final EnumPath<Platform> platform = createEnum("platform", Platform.class);

    public final DateTimePath<java.time.LocalDateTime> resignTime = createDateTime("resignTime", java.time.LocalDateTime.class);

    public QMember(String variable) {
        this(Member.class, forVariable(variable), INITS);
    }

    public QMember(Path<? extends Member> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMember(PathMetadata metadata, PathInits inits) {
        this(Member.class, metadata, inits);
    }

    public QMember(Class<? extends Member> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.memberImage = inits.isInitialized("memberImage") ? new QMemberImage(forProperty("memberImage"), inits.get("memberImage")) : null;
    }

}

