package com.Newbie.Newbie.global.token.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAccessTokenBlackList is a Querydsl query type for AccessTokenBlackList
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAccessTokenBlackList extends EntityPathBase<AccessTokenBlackList> {

    private static final long serialVersionUID = -340381152L;

    public static final QAccessTokenBlackList accessTokenBlackList = new QAccessTokenBlackList("accessTokenBlackList");

    public final StringPath accessToken = createString("accessToken");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public QAccessTokenBlackList(String variable) {
        super(AccessTokenBlackList.class, forVariable(variable));
    }

    public QAccessTokenBlackList(Path<? extends AccessTokenBlackList> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAccessTokenBlackList(PathMetadata metadata) {
        super(AccessTokenBlackList.class, metadata);
    }

}

