package com.login.login.global.token.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QRefreshTokenBlackList is a Querydsl query type for RefreshTokenBlackList
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRefreshTokenBlackList extends EntityPathBase<RefreshTokenBlackList> {

    private static final long serialVersionUID = 170489757L;

    public static final QRefreshTokenBlackList refreshTokenBlackList = new QRefreshTokenBlackList("refreshTokenBlackList");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath refreshToken = createString("refreshToken");

    public QRefreshTokenBlackList(String variable) {
        super(RefreshTokenBlackList.class, forVariable(variable));
    }

    public QRefreshTokenBlackList(Path<? extends RefreshTokenBlackList> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRefreshTokenBlackList(PathMetadata metadata) {
        super(RefreshTokenBlackList.class, metadata);
    }

}

