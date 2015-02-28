/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2015 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#ifdef USE_TI_UILABEL

#import "TiUIView.h"

@interface TiUILabel : TiUIView<LayoutAutosizing> {
@private
    UILabel *label;
    UIView* wrapperView;
    BOOL requiresLayout;
    CGRect padding;
    CGRect textPadding;
    UIControlContentVerticalAlignment verticalAlign;
    CGRect initialLabelFrame;
}

@property(nonatomic,getter=isHighlighted) BOOL     highlighted;          // default is NO
-(UILabel*)label;
@end

#endif