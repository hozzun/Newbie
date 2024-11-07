package com.newbie.auth.member.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberPlayerLike is a Querydsl query type for MemberPlayerLike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberPlayerLike extends EntityPathBase<MemberPlayerLike> {

    private static final long serialVersionUID = 1674301963L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberPlayerLike memberPlayerLike = new QMemberPlayerLike("memberPlayerLike");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final QMember member;

    public final NumberPath<Integer> playerId = createNumber("playerId", Integer.class);

    public QMemberPlayerLike(String variable) {
        this(MemberPlayerLike.class, forVariable(variable), INITS);
    }

    public QMemberPlayerLike(Path<? extends MemberPlayerLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberPlayerLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberPlayerLike(PathMetadata metadata, PathInits inits) {
        this(MemberPlayerLike.class, metadata, inits);
    }

    public QMemberPlayerLike(Class<? extends MemberPlayerLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
    }

}

